import PocketBase from 'pocketbase';

const pb = new PocketBase('https://lonely-cloth.pockethost.io/');
pb.collection("users").authWithPassword("test@example.com", "password");

pb.collection("settings").getOne("__schedule_conf").then(record => {
    console.log(record["file"])
})