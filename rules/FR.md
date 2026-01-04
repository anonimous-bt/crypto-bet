# Loterie Bitcoin

## Introduction

La **Loterie Bitcoin** est un système de loterie décentralisé qui fonctionne entièrement sur la blockchain de Bitcoin. Elle n'est associée à aucune organisation et dépend uniquement de la blockchain pour exister. La méthodologie pour générer les numéros est transparente et disponible dans ce dépôt GitHub. En utilisant les hachages de transaction et les hachages de blocs, les numéros sont générés et seront toujours identiques lorsque la même entrée est fournie.

Le code utilisé pour générer les numéros de la loterie peut être trouvé dans le dépôt, et vous pouvez le vérifier à tout moment. Le processus est entièrement auditable et transparent pour tous les participants.

## Règles de la Loterie

### 1. **Calendrier et Début**
- **Date de début** : La première loterie commencera le **01/01/2026 à 00:00 UTC**.
- **Fréquence** : Chaque tirage de loterie durera **1 008 blocs** (environ 1 semaine).
- **Premier bloc** : Le premier tirage sera basé sur l'exploitation du bloc Bitcoin **930210**.

### 2. **Participation et Coûts**
- **Coût par Séquence** : 5 000 satoshis (0.00005 BTC) par séquence.
- **Séquences Maximales par Transaction** : Vous pouvez entrer jusqu'à **10 séquences par transaction**. Toute quantité supérieure ne sera pas prise en compte.
- **Dépôt Minimum** : Si vous déposez moins de 5 000 satoshis, votre dépôt sera considéré comme un don et aucune séquence ne sera générée pour vous.
- **Gestion des Dépôts Supplémentaires** : Seuls les multiples de 5 000 satoshis seront pris en compte, avec une valeur maximale acceptée de 50 000 satoshis. Par exemple, si vous déposez 9 999 satoshis, une seule **séquence** sera valide et les 4 999 satoshis supplémentaires seront considérés comme un don.
- **Frais de Transaction** : Assurez-vous de vérifier les frais de transaction appliqués par votre portefeuille. Selon votre portefeuille, les frais peuvent être déduits de votre dépôt, ce qui pourrait affecter votre participation. Veuillez vous assurer que le dépôt est d'au moins 5 000 satoshis après les frais de transaction.

### 3. **Génération des Numéros**
Les numéros de la loterie sont générés en utilisant l'**ID de Transaction (TXID)** de votre transaction et le **Hash du dernier bloc** de la période de loterie. Chaque caractère du TXID et du hash du bloc est mappé à un numéro, ce qui donne un ensemble de numéros entre **1 et 50**.

Vous pouvez consulter le code de l'algorithme de génération des numéros ici :  
["../service/number_generation.js"]

### 4. **Distribution des Prix (90% des Revenus)**
- **60%** : Distribué aux utilisateurs qui correspondent à **5 numéros** dans leur séquence.
- **20%** : Distribué aux utilisateurs qui correspondent à **4 numéros** dans leur séquence.
- **10%** : Reporté au tirage suivant.
- **10%** : Réservé pour le **Super Prix** lors du dernier tirage de l'année.

Si aucun participant ne correspond à 5 numéros, le prix sera reporté au tirage suivant. La même règle s'applique au prix de 4 numéros.

### 5. **Transparence et Audit**
- Le code source du système de loterie est disponible publiquement sur **GitHub**, ce qui permet à quiconque de le télécharger et de l'exécuter eux-mêmes.
- Il y a également une page **GitHub Pages** où vous pouvez :
  - Vérifier l'état actuel de la loterie.
  - Vérifier vos séquences de numéros à l'aide de l'**ID de Transaction**.
  - Examiner les résultats et les prix des tirages précédents.
  
Vous pouvez trouver ces pages ici :  
https://lotto-btc.com

### 6. **Structure du Dépôt**
Le dépôt contient les dossiers suivants :
- **/reports** : Contient les rapports de chaque tirage de loterie, y compris les gagnants et la distribution des prix.
- **/prizes** : Contient les enregistrements de tous les paiements des prix, y compris les détails des transactions.

### 7. **Licence**
Ce projet est sous [Licence MIT](https://opensource.org/licenses/M

