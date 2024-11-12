// @ts-nocheck
import PocketBase from "pocketbase/cjs";

const pb = new PocketBase("https://lonely-cloth.pockethost.io");

async function main() {
    const list = await pb.collection("bookings").getList(1, 40, {
        filter: `date="${new Date().toLocaleDateString()}"`
    });

    console.log(list)

    let bookings = {}
    list["items"].forEach(booking => {
        bookings[`${booking["room"]}-${booking["period"]}`] = {
            name: booking["name"],
            email: booking["email"]
        };
    });

    return bookings;
}

main().then((bookings) => {
    console.log(bookings)
})