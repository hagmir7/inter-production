export class userController {
    constructor() { }

    async find() {
        return {
            full_name: "Hassan Agmir",
            email: "hagmir6@gmail.com",
            phone: "064251457",
            password: "password"
        };
    }

    async logUser(mainWindow) {

       

        setInterval(async () => {
            const user = await this.find(); 
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            mainWindow.webContents.send('statistics', formattedDate);
        }, 500);
    }
}
