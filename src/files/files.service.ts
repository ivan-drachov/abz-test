import { HttpException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
const tinify = require("tinify");

@Injectable()
export class FilesService {

    async create(image): Promise<string>{
        tinify.key = "v1Szcf8Ss00GRWMqK5f4JcBdK2kCkZly";
        try{
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'images')
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), image.buffer)
            const source = tinify.fromFile(path.join(filePath, fileName));
            const fileNameOpt = fileName.slice(0, -4) + '_opt' + fileName.slice(-4);
            const fileNameResized = fileName.slice(0, -4) + '_resized' + fileName.slice(-4);
            source.toFile(path.join(filePath, fileNameOpt));
            const resized = source.resize({
                method: "cover",
                width: 70,
                height: 70
              });
            resized.toFile(path.join(filePath, fileNameResized));
            return "https://ivan-abz-test-app.herokuapp.com/"+fileNameResized;
        }catch(e){
            console.log(e.message)
            throw new HttpException('Ошибка при записи файла', 500)
            
        }
    }
}
