import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface RoomLike {
    idSala?: number | string;
    [key: string]: unknown;
}

export type MessageHandler = (roomId: number, message: unknown) => void;

let stompClient: Client | null = null;
const subscriptions = new Map<number, StompSubscription>();

const getWebSocketUrl = (): string => {
    const apiBase = import.meta.env.VITE_ENDERECO_API || 'http://localhost:8080';
    return `${apiBase}/websocket`;
};

const subscribeToRoom = (roomId: number, onMessageReceived: MessageHandler): void => {
    if (!stompClient?.connected || subscriptions.has(roomId)) {
        return;
    }

    const subscription = stompClient.subscribe(`/topic/message/${roomId}`, (message) => {
        try {
            const body = JSON.parse(message.body);
            onMessageReceived(roomId, body);
        } catch (error) {
            console.error('Erro ao processar mensagem WebSocket:', error);
        }
    });

    subscriptions.set(roomId, subscription);
};

export const connect = (salas: RoomLike[] | null | undefined, onMessageReceived: MessageHandler): void => {
    const roomIds = (salas || [])
        .map((sala) => Number(sala.idSala))
        .filter((idSala) => Number.isFinite(idSala));

    if (stompClient?.connected) {
        roomIds.forEach((roomId) => subscribeToRoom(roomId, onMessageReceived));
        return;
    }

    let token: string | null = null;
    try {
        const storedToken = localStorage.getItem('token');
        token = storedToken ? JSON.parse(storedToken) : null;
    } catch {
        token = null;
    }

    if (!token) {
        console.error('❌ Não foi possível conectar ao WebSocket: usuário não autenticado.');
        return;
    }

    stompClient = new Client({
        webSocketFactory: () => new SockJS(getWebSocketUrl()),
        connectHeaders: { Authorization: 'Bearer ' + token },
        onConnect: () => {
            roomIds.forEach((roomId) => subscribeToRoom(roomId, onMessageReceived));
        },
        onStompError: (frame) => {
            console.error('❌ Erro na conexão STOMP:', frame);
        },
        onWebSocketError: (error) => {
            console.error('❌ Erro na conexão STOMP:', error);
        },
    });

    stompClient.activate();
};

export const disconnect = (): void => {
    if (stompClient) {
        subscriptions.forEach((subscription) => subscription.unsubscribe());
        subscriptions.clear();
        stompClient.deactivate().then(() => {
            stompClient = null;
        });
    }
};
