import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {}

    export const
    handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
        // Jeżeli w moim programie byłaby możliwość, że wchodzimy do elementu, który nie istnieje to przydałaby mi się taki kod:
        /*
            if (err instanceof NotFoundError) {
                res
                    .status(404)
                    .render('error', {
                        message: 'Nie można znależć elementuo danym ID',
                    });
                    return;
            }
        */
        console.error(err);

        res
            .status(err instanceof ValidationError ? 400 : 500)
            .json( {
                errorMessage: err instanceof ValidationError ? err.message : 'Sorry, please try again later.',
            });
    };
