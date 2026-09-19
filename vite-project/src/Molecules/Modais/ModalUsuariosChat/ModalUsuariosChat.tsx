import { Popover, List, ListItem, ListItemText, IconButton, Typography, Divider, ListItemSecondaryAction
} from '@mui/material';
import { Delete, PersonAdd } from '@mui/icons-material'
import { Usuario } from '../../../Utils/cruds/CrudsUsuario';

interface ModalUsuariosChatProps {
    participantes: Usuario[];
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

const ModalUsuariosChat = ({ participantes, open, anchorEl, onClose }: ModalUsuariosChatProps) => {
    const id = open ? 'tarefas-popover' : undefined;

    const onAdd = () => {

    }

    const onRemove = (id: number | string | undefined) => {

    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <List sx={{ width: 300, maxHeight: 300, background: 'background.default', color: 'text.primary' }}>
        {participantes.map((participante, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1.5,
            }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  {participante.nome}
                </Typography>
              }
            />
            <IconButton edge="end" onClick={() => onRemove(participante.idUsuario)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}

        <ListItem
          onClick={onAdd}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
            color: '#90caf9',
            gap: 1,
            cursor: 'pointer'
          }}
        >
          <PersonAdd />
          <Typography fontWeight="bold">Adicionar Participante</Typography>
        </ListItem>
      </List>
        </Popover>
    );
};

export default ModalUsuariosChat;
