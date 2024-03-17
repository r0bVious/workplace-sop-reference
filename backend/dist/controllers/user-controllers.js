import User from "../models/user.js";
import { hash } from "bcrypt";
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
const signUpUser = async (req, res, next) => {
    try {
        const { name, position, password, admin_priv } = req.body;
        const hashedPassword = await hash(password, 10);
        const newUser = new User({
            name,
            position,
            password: hashedPassword,
            admin_priv,
        });
        await newUser.save();
        return res.status(201).json({ message: "OK", id: newUser._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export { getAllUsers, signUpUser };
//# sourceMappingURL=user-controllers.js.map