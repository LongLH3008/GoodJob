import Database from "./src/providers/Database";
import Express from "./src/providers/Express";

class App {
	public loadDatabase() {
		Database.connect();
	}
	public loadServer() {
		Express.init();
	}
}

new App().loadDatabase();
new App().loadServer();
