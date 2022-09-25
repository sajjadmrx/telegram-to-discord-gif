import ffmpegInstaller from "@ffmpeg-installer/ffmpeg"

import Ffmpeg from "fluent-ffmpeg"

Ffmpeg.setFfmpegPath(ffmpegInstaller.path)
const ffmpeg = Ffmpeg()

export class Converter {
    static async videoToGif(input: string, output: string): Promise<void> {
        return new Promise((resolve, reject) => {
            ffmpeg
                .input(input)
                .on("end", () => {
                    resolve()
                })
                .on("error", (e) => reject(e))
                .outputOption("-vf", "scale=320:-1:flags=lanczos,fps=15")
                .output(output)
                .run()
        })
    }
}

