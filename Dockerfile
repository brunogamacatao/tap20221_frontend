# ESSE É O STEP DE CONSTRUÇÃO (builder)
FROM node:16.14.2-slim AS builder

# 1. Defino a pasta para onde os arquivos serão copiados
WORKDIR /app
# 2. Copio apenas o package.json
COPY package.json .
# 3. Instalo as dependências definidas no package.json
RUN npm install
# 4. Copio o restante dos arquivos (código fonte)
COPY . .

# 5. Crio um argumento de linha de comando (BACKEND_URL) 
ARG BACKEND_URL=http://192.168.1.10:5000
# 6. Atribuo o valor do argument à variável de ambiente REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$BACKEND_URL
RUN echo "BACKEND_URL = $BACKEND_URL"

# 7. Faço o build da aplicação (gerar a versão para produção)
RUN npm run build

# Durante a construção, o usuário deve informar a URL do backend
# docker build --build-arg BACKEND_URL=http://192.168.1.10:5000 ...

# ESSE É O STEP QUE EXECUTA O SERVIDOR (server)
FROM nginx AS server
COPY --from=builder /app/build /usr/share/nginx/html