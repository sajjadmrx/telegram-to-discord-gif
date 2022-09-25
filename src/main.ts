import {config} from 'dotenv'

config()

import {Bot, Context} from "grammy";
import {Webhook, WebhookClient} from 'discord.js'
import {FileFlavor, hydrateFiles} from "@grammyjs/files";
import path from "path";
import {Converter} from "./converter";
import {unlink} from "fs/promises";

type MyContext = FileFlavor<Context>;

const bot = new Bot<MyContext>(String(process.env.TELEGRAM_BOT_TOKEN));

bot.api.config.use(hydrateFiles(bot.token));

const filesPath: string = './files'
bot.on([":video", ":animation"], async (ctx) => {
    try {
        const file = await ctx.getFile();
        const filename: string = getUUId() + '.mp4'
        const filenameOutPut: string = getUUId() + '.gif'
        await file.download(path.resolve(getFilePath(filename)));
        await Converter.videoToGif(getFilePath(filename), getFilePath(filenameOutPut))
        await ctx.reply('✅ Done..')
        const client = new WebhookClient({url: String(process.env.WEBHOOK)})
        await client.send({
            files: [{
                attachment: getFilePath(filenameOutPut),
                name: filenameOutPut
            }]
        })

        await ctx.reply('ب دیسکورد ارسال شد!')
        try {
            await unLinkFile(getFilePath(filenameOutPut))
            await unLinkFile(getFilePath(filename))
            await ctx.reply('unlinked 🧹🗑️')
        } catch (e) {

        }
    } catch (e: any) {
        console.log(e)
        ctx.reply(e.message || 'ی خطایی داد')
    }
});

bot.start({
    drop_pending_updates: true, onStart: (u) => {
        console.log(`🟢 ${u.username} is Online`)
    }
})

function getFilePath(filename: string): string {
    return `${filesPath}/${filename}`
}

async function unLinkFile(file: string) {
    try {
        await unlink(file)
    } catch (e) {
        throw e
    }
}

function getUUId(): string {
    return Date.now().toString()
}