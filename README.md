# Email Sender Function
Bem-vindo ao repositório da Cloud Function dedicada a lidar com envios de emails de maneira otimizada, siga as instruções abaixo para poder utilizar o sistema:

## Como usar:
Para começar a fazer o uso da aplicação, instale as dependências utilizando o PNPM, evite utilizar outros gerenciadores de pacotes diferentes, pois o sistema de cache das pipelines do sistema estão armazenando dependências com base apenas no PNPM:
```
pnpm install
```

Logo em seguida, ative o husky em seu repositório local:
```
pnpm set-hooks
```

Como último passo, faça o login no firebase e instale o emulador do firestore para se conectar com sua propria instância localmente:
```
pnpm firebase login && pnpm firebase init emulators
```
Você será perguntado sobre quais emuladores deseja instalar, selecione a UI e os demais na qual você possui interesse.

Feito isso, você já pode começar a utilizar o sistema com base nos comandos disponíveis no package.json, apenas lembre-se que para fazer o uso do commitizen, será necessário executar 'pnpm commit' toda vez que precisar fazer os seus commits
