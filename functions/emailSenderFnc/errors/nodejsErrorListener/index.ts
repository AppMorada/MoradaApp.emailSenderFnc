export class NodejsErrorListener {
	static exec() {
		const errorTypes = ['uncaughtException', 'unhandledRejection'];

		errorTypes.forEach((item) => {
			process.on(item, (err) => {
				console.error(
					`Alguma coisa ruim aconteceu! Evento: ${item}, msg: ${err.stack || err}`,
				);
			});
		});
	}
}
