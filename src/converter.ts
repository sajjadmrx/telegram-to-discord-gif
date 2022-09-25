import ffmpeg from 'fluent-ffmpeg';
import Ffmpeg from 'fluent-ffmpeg';
import {path as pathFFmpeg} from '@ffmpeg-installer/ffmpeg';

Ffmpeg.setFfmpegPath(pathFFmpeg);


export class Converter {
    static async videoToGif(input: string, output: string): Promise<void> {
        return new Promise((resolve, reject) => {
            ffmpeg(input)
                .on("end", () => {
                    resolve()
                })
                .on("error", (e) => reject(e))
                .outputOption("-vf", "scale=320:-1:flags=lanczos,fps=15")
                .save(output)
        })
    }
}

