# Lotería de Bitcoin

## Introducción

La **Lotería de Bitcoin** es un sistema de lotería descentralizado que opera completamente sobre la blockchain de Bitcoin. No está asociada con ninguna organización y depende únicamente de la blockchain para existir. La metodología para generar los números es transparente y está disponible en este repositorio de GitHub. Usando los hashes de las transacciones y los hashes de los bloques, los números se generan y siempre serán los mismos cuando se proporcione la misma entrada.

El código utilizado para generar los números de la lotería puede encontrarse en el repositorio, y puedes verificarlo en cualquier momento. El proceso es completamente auditado y transparente para todos los participantes.

## Reglas de la Lotería

### 1. **Calendario y Comienzo**
- **Fecha de inicio**: La primera lotería comenzará el **01/01/2026 a las 00:00 UTC**.
- **Frecuencia**: Cada sorteo de la lotería durará **1,008 bloques** (aproximadamente 1 semana).
- **Primer Bloque**: El primer sorteo se basará en la minería del bloque de Bitcoin **930210**.

### 2. **Participación y Costos**
- **Costo por Secuencia**: 5,000 satoshis (0.00005 BTC) por secuencia.
- **Máximo de Secuencias por Transacción**: Puedes ingresar hasta **10 secuencias por transacción**. Cualquier cantidad superior a esto no será considerada.
- **Depósito Mínimo**: Si depositas menos de 5,000 satoshis, tu depósito será considerado una donación y no se generará ninguna secuencia para ti.
- **Manejo de Depósitos Extras**: Solo se considerarán múltiplos de 5,000 satoshis, con un valor máximo aceptado de 50,000 satoshis. Por ejemplo, si depositas 9,999 satoshis, solo se generará **1 secuencia** y los 4,999 satoshis adicionales serán considerados como donación.
- **Comisiones de Transacción**: Asegúrate de verificar la comisión de transacción que cobra tu billetera. Dependiendo de tu billetera, la comisión puede ser deducida de tu depósito, lo que podría afectar tu participación. Asegúrate de que el depósito sea al menos de 5,000 satoshis después de deducidas las comisiones de transacción.

### 3. **Generación de Números**
Los números de la lotería se generan utilizando el **ID de Transacción (TXID)** de tu transacción y el **Hash del último bloque** del período de la lotería. Cada carácter del TXID y el hash del bloque se mapea a un número, lo que da como resultado un conjunto de números entre **1 y 50**.

Puedes revisar el código del algoritmo de generación de números aquí:  
["../service/number_generation.js"]

### 4. **Distribución de Premios (90% de los Ingresos)**
- **60%**: Distribuido a los usuarios que coincidan con **5 números** en su secuencia.
- **20%**: Distribuido a los usuarios que coincidan con **4 números** en su secuencia.
- **10%**: Se acumula para el siguiente sorteo.
- **10%**: Reservado para el **Súper Premio** en el último sorteo del año.

Si ningún participante acierta 5 números, el premio se acumulará para el siguiente sorteo. La misma regla se aplica para el premio de 4 números.

### 5. **Transparencia y Auditoría**
- El código fuente del sistema de lotería está disponible públicamente en **GitHub**, lo que permite que cualquier persona pueda descargarlo y ejecutarlo por sí misma.
- También hay una página de **GitHub Pages** donde puedes:
  - Consultar el estado de la lotería actual.
  - Verificar tus secuencias de números usando el **ID de Transacción**.
  - Revisar los resultados y premios de sorteos anteriores.
  
Puedes encontrar estas páginas aquí:  
https://lotto-btc.com 

### 6. **Estructura del Repositorio**
El repositorio contiene las siguientes carpetas:
- **/reports**: Contiene los informes de cada sorteo, incluyendo los ganadores y la distribución de premios.
- **/prizes**: Contiene los registros de todos los pagos de premios, incluyendo detalles de transacciones.

### 7. **Licencia**
Este proyecto está licenciado bajo la [Licencia MIT](https://opensource.org/licenses/MIT), a menos que se indique lo contrario.

