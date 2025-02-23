# API de Justification de Texte

## Description
API REST de justification de texte avec limite de 80 caractères par ligne.

## Installation
```bash
git clone https://github.com/Bbaidar/text-justify-api.git
cd text-justify-api
npm install
```

## Documentation API

### Générer un Token
```bash
curl -X POST http://localhost:3000/api/token \
-H "Content-Type: application/json" \
-d "{\"email\":\"test@example.com\"}"
```

### Justifier un Texte
```bash
curl -X POST http://localhost:3000/api/justify \
-H "Authorization: Bearer votre_token" \
-H "Content-Type: text/plain" \
-d "Votre texte à justifier"
```

## Caractéristiques
- ✅ Limite de 80 caractères par ligne
- 🔐 Authentification par token
- 📊 80 000 mots/jour maximum
- 🧪 Tests : 74% couverture