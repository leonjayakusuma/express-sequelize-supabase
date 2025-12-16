import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import DOMPurify from "isomorphic-dompurify";

// Wrapper function to match express-validator's CustomSanitizer signature
const sanitizeInput = (value: any): string => {
    if (typeof value === 'string') {
        return DOMPurify.sanitize(value);
    }
    return String(value);
};

/* Using a library to validate the types passed in */
export function validatePositiveInt(
    paramName: string,
    validator: (field: string) => ValidationChain = body,
): Array<ValidationChain | ((req: Request, res: Response, next: NextFunction) => void | Response)> {
    return [
        validator(paramName).notEmpty().isInt({ min: 1 }).toInt(),
        (req: Request, res: Response, next: NextFunction): void | Response => {
            console.log(req.query);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ msg: "Invalid id" });
            }
            next();
        },
    ];
}

export function validatePositiveFloat(
    paramName: string,
    validator: (field: string) => ValidationChain = body,
): Array<ValidationChain | ((req: Request, res: Response, next: NextFunction) => void | Response)> {
    return [
        validator(paramName).notEmpty().isFloat({ min: 0 }).toFloat(),
        (req: Request, res: Response, next: NextFunction): void | Response => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ msg: "Invalid id" });
            }
            next();
        },
    ];
}

export function validateString(
    paramName: string,
    validator: (field: string) => ValidationChain = body,
): Array<
    | ValidationChain
    | ((req: Request, res: Response, next: NextFunction) => void | Response)
> {
    return [
        validator(paramName)
            .notEmpty()
            .isString()
            .customSanitizer(sanitizeInput),
        (req: Request, res: Response, next: NextFunction): void | Response => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ msg: "Invalid string" });
            }
            next();
        },
    ];
}

export function validateEmail(
    paramName: string,
    validator: (field: string) => ValidationChain = body,
): Array<ValidationChain | ((req: Request, res: Response, next: NextFunction) => void | Response)> {
    return [
        validator(paramName)
            .notEmpty()
            .isString()
            .isEmail()
            .customSanitizer(sanitizeInput),
        (req: Request, res: Response, next: NextFunction): void | Response => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ msg: "Invalid email" });
            }
            next();
        },
    ];
}

export function validateBoolean(
    paramName: string,
    validator: (field: string) => ValidationChain = body,
): Array<ValidationChain | ((req: Request, res: Response, next: NextFunction) => void | Response)> {
    return [
        validator(paramName).notEmpty().isBoolean().toBoolean(),
        (req: Request, res: Response, next: NextFunction): void | Response => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(403).json({ msg: "Invalid boolean" });
            }
            next();
        },
    ];
}
