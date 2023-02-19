#!/bin/bash
red=$(tput setaf 1)
green=$(tput setaf 2)
reset=$(tput sgr0)
space() {
    for ((i = 1; i <= $1; i++)); do
        echo
    done
}

echo "                        Telegram Gifs For Discord!           "
space 5
echo "config .env file"
space 3

read -p "Enter Discord WEBHOOK: " WEBHOOK
space 2
read -p "Enter Telegram TELEGRAM_BOT_TOKEN (use @BotFather): " TELEGRAM_BOT_TOKEN
space 2
echo "WEBHOOK=$WEBHOOK" >.env
echo "TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN" >>.env
echo "${green}Values saved to .env file${reset}"
space 3

read -p "Do you want to run '${green}npm run start${reset}' automatically? [y/n]: " REPLY

if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run start
else
    echo "Run 'start' manually to start the bot. ${red}[Exiting...]${reset}"
    sleep 3
fi
