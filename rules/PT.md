# Loteria Bitcoin

## Introdução

A **Loteria Bitcoin** é um sistema de loteria descentralizado que opera completamente na blockchain do Bitcoin. Não está associada a nenhuma organização, dependendo exclusivamente da blockchain para existir. A metodologia de geração dos números é transparente e está disponível neste repositório do GitHub. Usando hashes de transações e hashes de blocos, os números são gerados e serão sempre os mesmos quando a mesma entrada for fornecida.

O código usado para gerar os números da loteria pode ser encontrado no repositório, e você pode verificá-lo a qualquer momento. O processo é totalmente auditável e transparente para todos os participantes.

## Regras da Loteria

### 1. **Calendário e Início**
- **Data de início**: O primeiro sorteio começará em **01/01/2026 às 00:00 UTC**.
- **Frequência**: Cada sorteio da loteria durará **1.008 blocos** (aproximadamente 1 semana).
- **Primeiro bloco**: O primeiro sorteio será baseado na mineração do bloco Bitcoin **930210**.

### 2. **Participação e Custos**
- **Custo por Sequência**: 5.000 satoshis (0.00005 BTC) por sequência.
- **Máximo de Sequências por Transação**: Você pode entrar com até **10 sequências por transação**. Qualquer valor acima disso não será considerado.
- **Depósito Mínimo**: Se você depositar menos de 5.000 satoshis, seu depósito será considerado uma doação e nenhuma sequência será gerada para você.
- **Tratamento de Depósitos Extras**: Apenas múltiplos de 5.000 satoshis serão aceitos, com um valor máximo aceito de 50.000 satoshis. Por exemplo, se você depositar 9.999 satoshis, **apenas 1 sequência** será válida e os 4.999 satoshis extras serão considerados como doação.
- **Taxas de Transação**: Certifique-se de verificar as taxas de transação cobradas pela sua carteira. Dependendo da sua carteira, a taxa pode ser deduzida do seu depósito, o que pode afetar sua entrada. Certifique-se de que o depósito seja de pelo menos 5.000 satoshis após as taxas de transação.

### 3. **Geração de Números**
Os números da loteria são gerados usando o **ID da Transação (TXID)** da sua transação e o **Hash do último bloco** do período da loteria. Cada caractere do TXID e do hash do bloco é mapeado para um número, resultando em um conjunto de números entre **1 e 50**.

Você pode revisar o código do algoritmo de geração de números aqui:  
["../service/number_generation.js"]

### 4. **Distribuição de Prêmios (90% da Receita)**
- **60%**: Distribuído para os usuários que acertarem **5 números** em sua sequência.
- **20%**: Distribuído para os usuários que acertarem **4 números** em sua sequência.
- **10%**: Acumulado para o próximo sorteio.
- **10%**: Reservado para o **Super Prêmio** no último sorteio do ano.

Se nenhum participante acertar 5 números, o prêmio será acumulado para o próximo sorteio. A mesma regra se aplica ao prêmio de 4 números.

### 5. **Transparência e Auditoria**
- O código-fonte do sistema de loteria está disponível publicamente no **GitHub**, permitindo que qualquer pessoa faça o download e execute o código por conta própria.
- Também há uma página **GitHub Pages** onde você pode:
  - Verificar o status da loteria atual.
  - Verificar suas sequências de números usando o **ID da Transação**.
  - Rever os resultados da loteria anterior e os prêmios.

Você pode encontrar essas páginas aqui:  
https://lotto-btc.com

### 6. **Estrutura do Repositório**
O repositório contém as seguintes pastas:
- **/reports**: Contém relatórios de cada sorteio de loteria, incluindo os vencedores e a distribuição dos prêmios.
- **/prizes**: Contém registros de todos os pagamentos dos prêmios, incluindo detalhes das transações.

### 7. **Licença**
Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT), salvo indicação em contrário.

