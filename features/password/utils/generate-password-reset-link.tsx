import { getBaseUrl } from "@/components/utils/url";
import { resetPasswordPath } from "@/paths";
import { generateRandomToken, hashToken } from "@/components/utils/crypto";
import prisma from "@/lib/prisma";


const generatePasswordResetLink = async (userId: string) => {

    // const passwordResetLink = pageUrl + passwordResetToken
    const pageUrl = getBaseUrl() + resetPasswordPath()
    const tokenId = generateRandomToken(); //TODO: generate a unique token and store it in the database with an expiration time
    const tokenHash = hashToken(tokenId); //TODO: hash the token before storing it in the database
    
    await prisma.passwordResetToken.create({
        data: {
            tokenHash,
            userId,
            expiresAt: new Date(Date.now() + 7200000), // 2 hours from now
        },
    });
   
    const passwordResetLink = pageUrl + `/${tokenId}`;



    return passwordResetLink;
};

 export { generatePasswordResetLink };