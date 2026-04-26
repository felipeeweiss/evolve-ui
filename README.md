# Evolve UI

Biblioteca de componentes para React Native com tema centralizado via `evolve.config`.

## Requisitos

- Node.js com npm, pnpm ou yarn
- Projeto **React Native** com **React 18+** e **React Native 0.72+** (peer dependencies)

## Instalação

No diretório do seu app:

```bash
npm install @felipeeweiss/evolve-ui
```

Com yarn ou pnpm:

```bash
yarn add @felipeeweiss/evolve-ui
```

```bash
pnpm add @felipeeweiss/evolve-ui
```

O pacote não instala `react` nem `react-native` por conta própria; eles devem já existir no seu projeto.

## Configuração do tema

1. Crie um arquivo **`evolve.config.ts`** (ou `.js`) na raiz do app — pode copiar e adaptar o modelo `evolve.config.example.ts` que vem no pacote.

2. Envolva a árvore da aplicação com **`EvolveUIProvider`** e passe o objeto de configuração:

```tsx
import { EvolveUIProvider, Button } from '@felipeeweiss/evolve-ui';
import evolveConfig from './evolve.config';

export default function App() {
  return (
    <EvolveUIProvider config={evolveConfig}>
      <Button variant="primary" onPress={() => {}}>
        Salvar
      </Button>
    </EvolveUIProvider>
  );
}
```

3. Os componentes usam `useEvolveUI()` para ler as cores; você pode sobrescrever estilos com as props `style` e `textStyle` onde forem expostas (por exemplo no `Button`).

## Desenvolvimento local desta biblioteca

Para testar alterações sem publicar no npm, use dependência por caminho no `package.json` do app:

```json
{
  "dependencies": {
    "@felipeeweiss/evolve-ui": "file:../caminho/para/evolve-ui"
  }
}
```

Depois rode `npm install` no app. Antes de publicar, na pasta da lib execute `npm run build` para gerar os arquivos de tipos em `dist/`.

## Licença

MIT
