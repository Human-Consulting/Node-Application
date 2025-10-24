# 🚀 Configurando Nginx para Servir Aplicação em uma Instância EC2

Este guia mostra como configurar o **Nginx** para servir arquivos estáticos (como o `dist/` de um projeto React, Vite ou Angular) dentro de uma instância **EC2 Ubuntu**.

---

## **1. Criar infraestrutura**

1. **Crie a VPC.**
2. **Crie a instância EC2 (Ubuntu):**
   - Abra a porta **22 (SSH)** para acesso remoto.
   - Abra a porta **80 (HTTP)** para acesso via navegador.

---

## **2. Gerar build do frontend**

Na pasta do seu projeto **Front**, execute:

```bash
npm run build
```

🔹 Isso criará a pasta `dist/`, que é a versão otimizada do seu frontend.

## **3. Copiar o build para a EC2**

No terminal da sua máquina local, rode:

```bash
scp -i "par-chaves.pem" -r "C:\Users\jpmor\OneDrive - SPTech School\human_consulting\Node-Application\vite-project\dist" ubuntu@23.20.35.0:~/
```

➡️ Esse comando envia a pasta `dist/` da sua máquina para a home do usuário `ubuntu` na instância.

## **4. Acessar a instância via SSH**

No diretório onde está sua chave `.pem`, conecte-se com:

```bash
ssh -i "par-chaves.pem" ubuntu@ec2-98-88-148-77.compute-1.amazonaws.com
```

💡 Esse comando pronto também aparece em:
**EC2 > Instâncias > SUA_INSTÂNCIA > Conectar**

---

## **5. Preparar ambiente na EC2**

Agora dentro da EC2, rode:

```bash
# Atualizar pacotes
sudo apt update

# Instalar Nginx
sudo apt install nginx -y
```

### **6. Substituir o site padrão do Nginx**

Remova o index padrão do Nginx:

```bash
sudo rm /var/www/html/index.nginx-debian.html
```

Mova o seu build `dist/` para o diretório do Nginx:

```bash
sudo mv ~/dist /var/www/html/
```

### **7. Configurar o Nginx**

Abra o arquivo de configuração:

```bash
sudo nano /etc/nginx/sites-available/default
```

Procure pela linha `root` e altere para:

```nginx
root /var/www/html/dist;
```

Salve e saia (CTRL+O, ENTER, CTRL+X).

### **8. Ajustar permissões**

Verifique permissões da pasta:

```bash
ll /var/www/html
```

Se `dist/` aparecer como `drwx------`, dê acesso de leitura para o Nginx:

```bash
sudo chmod -R 755 /var/www/html/dist
```

### **9. Recarregar o Nginx**

Por fim, recarregue o serviço:

```bash
sudo systemctl reload nginx
```

---

## ✅ **Resumo do que foi feito**

- Criou a build do frontend (`npm run build`).
- Copiou a pasta `dist/` para a EC2 com `scp`.
- Conectou-se na instância via SSH.
- Atualizou pacotes e instalou o Nginx.
- Removeu o index padrão do Nginx.
- Moveu a pasta `dist/` para `/var/www/html`.
- Configurou o Nginx para usar `root /var/www/html/dist`.
- Ajustou permissões para o Nginx poder ler os arquivos.
- Recarregou o Nginx e colocou o site no ar 🚀.