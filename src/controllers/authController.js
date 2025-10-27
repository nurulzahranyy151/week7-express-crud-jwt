const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async(req, res) => {
    try{
        const{username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: "Username and Password are required"
            });
        }

    const [existingUsers] = await db.query("SELECT id FROM users WHERE username = ? " , [username]);
    if(existingUsers.length > 0){
        return res.status(409).json({
            success: false,
            message: "Username already exists"
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const[result] = await db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]
    );

    res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data: {id: result.insertId, username}
    });
} catch (error){
    res.status(500).json({
        success: false,
        error: error.message
    });
}
};

exports.login = async(req, res) => {
        try{
            const {username, password} = req.body;

            if(!username || !password){
                return res.status(400).json({
                    success: false,
                    message: "Username and password are required"
                });
            }
            const [results] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
            const user = results[0];

            if(!user || !bcrypt.compareSync(password, user.password)){
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials"
                });
            }
            const token = jwt.sign({
                id: user.id, username: user.username
            },
        process.env.JWT_SECRET,
    {expiresIn: "1h"});
    res.json({success: true, token});
        } catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
};