import ffmpeg from 'fluent-ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';
import { path as pathFFmpeg } from '@ffmpeg-installer/ffmpeg';

Ffmpeg.setFfmpegPath(pathFFmpeg);


export class Converter {
    constructor(private input: string, private output: string) { }
    async videoToGif(): Promise<void> {
        return new Promise((resolve, reject) => {
            ffmpeg(this.input)
                .on("end", () => {
                    resolve()
                })
                .on("error", (e) => reject(e))
                .outputOption("-vf", "scale=320:-1:flags=lanczos,fps=15,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse")
                .save(this.output)
        })
    }
}

