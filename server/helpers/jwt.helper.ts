import jwt from "jsonwebtoken"

interface TokenPayload {
    _id: string
    username: string
}

export function generateTokens({ _id, username }: TokenPayload) {
    const accessToken = jwt.sign(
        { _id, username },
        process.env.JWT_SECRET,
        {
            expiresIn: '5m'
        }
    )

    const refreshToken = jwt.sign(
        { _id, username },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        }
    )

    return {
        accessToken,
        refreshToken
    }
}