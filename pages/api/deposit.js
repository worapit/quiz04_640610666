import { checkToken } from "../../backendLibs/checkToken";

export default function depositRoute(req, res) {
  if (req.method === "PUT") {
    //check authentication
    const user = checkToken(req);
    // return res.status(403).json({ ok: false, message: "You do not have permission to deposit" });
    if (!user || user.isAdmin) {
      return res.status(403).json({
        ok: false,
        message: "You do not have permission to deposit",
      });
    }

    const amount = req.body.amount;
    //validate body
    if (typeof amount !== "number")
      return res.status(400).json({ ok: false, message: "Invalid amount" });

    //check if amount < 1
    if (amount < 1) {
      return res
        .status(400)
        .json({ ok: false, message: "Amount must be greater than 0" });
    }
    // return res.status(400).json({ ok: false, message: "Amount must be greater than 0" });

    //find and update money in DB
    const users = readUsersDB();
    const userIdx = users.findIndex((x) => x.username === user.username);

    //create message

    const newMoney = {
      money: amount + user.money,
    };
    users[userIdx].money.push(newMoney);

    writeChatRoomsDB(rooms);

    return res.json({
      ok: true,
      messages: newMoney,
    });

    //return response
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
