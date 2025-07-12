FROM node:20

WORKDIR /app

# Nur package.json & package-lock.json (falls vorhanden) kopieren und installieren
COPY package*.json ./
RUN npm install

# Dann den Rest kopieren
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
