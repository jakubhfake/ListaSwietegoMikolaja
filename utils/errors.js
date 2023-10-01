class ValidationError extends Error {}

    const
    handleError = (err, req, res, next) => {
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
            .render('errors/error', {
                errorMessage: err instanceof ValidationError ? err.message : 'Przepraszamy, spróbuj ponownie za kilka minut',
            });
    };

module.exports = {
    handleError,
    ValidationError,

}