// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

/**
 * Crea un archivo ".log" cuando se registre un error.
 */
export const logFile = fs.createWriteStream(path.join(__dirname, '../../log/error.log'), { flags: 'a' })

/**
 * Omite todos los request que el status sea 2** o 3**
 */
export const skipSuccess = (req : Request, res : Response) => res.statusCode < 400
