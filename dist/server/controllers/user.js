"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var userModel_1 = require("../models/userModel");
var base_1 = require("./base");
var UserCtrl = (function (_super) {
    __extends(UserCtrl, _super);
    function UserCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = userModel_1.default;
        _this.login = function (req, res) {
            console.log(req.body);
            _this.model.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    var token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                    res.status(200).json({ token: token });
                });
            });
        };
        _this.forgot = function (req, res) {
            // var transporter = nodemailer.createTransport({
            //   service: 'gmail',
            //   auth: {
            //     user: 'mailtestsidd@gmail.com',
            //     pass: 'siddtest'
            //   }
            // });
            // transporter.sendMail(mailOptions, function(error, info){
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log('Email sent: ' + info.response);
            //   }
            // });
            // console.log('in service')
            console.log('in service' + req.body);
            // bcrypt.genSalt(10, function(err, salt) {
            //   if (err) { return console.log(err); }
            //   bcrypt.hash(req.body.password, salt, function(error, hash) {
            //     if (error) {console.log(error); }
            //     req.body.password = hash;
            //     console.log(hash);
            //   });
            // });
            _this.model.findOneAndUpdate({ email: req.body.email }, req.body, function (err) {
                if (err) {
                    return console.error(err);
                }
                else {
                }
                _this.model.findOne({ email: req.body.email }, function (err, user) {
                    if (!user) {
                        return res.sendStatus(403);
                    }
                    console.log('emailId: ' + user);
                    try {
                        var transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'mailtestsidd@gmail.com',
                                pass: 'siddtest'
                            }
                        });
                        var mailOptions = {
                            from: 'mailtestsidd@gmail.com',
                            to: user.email,
                            subject: 'New Generated Password for User',
                            text: "Dear User,\n               This is your newly generated password from system." + req.body.password
                        };
                        // const mailOptions = {
                        //   from: 'mailtestsidd@gmail.com',
                        //   to: user.email,
                        //   subject: 'New Generated Password for User',
                        //   text: `Dear User,
                        //      This is your newly generated password from system.` + req.body.password
                        // };
                        // transporter.sendMail(mailOptions, function (error, info) {
                        //   console.log('mailOptions: ' + mailOptions);
                        //   res.status(200).json({ message: 'Password has been sent.' });
                        // });
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        // console.log('mailOptions: ' + mailOptions );
                        // res.status(200).json({ message: 'Password has been sent.' });
                    }
                    catch (error) {
                        debugger;
                        console.log('error: ' + error);
                    }
                });
                // user.comparePassword(req.body.password, (error, isMatch) => {
                //   if (!isMatch) { return res.sendStatus(403); }
                //   const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                //   res.status(200).json({ token: token });
                // });
                //});
            });
        };
        return _this;
    }
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map