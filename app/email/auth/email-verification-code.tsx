import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type EmailVerificationCodeProps = {
  toName: string;
  code: string;
};

const EmailVerificationCode = ({ toName, code }: EmailVerificationCodeProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
       <Body className="font-sans m-8 text-center">         
         <Container>
            <Section>
              <Text>
                Hello {toName}, please verify your email by sending the code below.
              </Text>
            </Section>
            <Section>
              <Text className="text-2xl font-bold">{code}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerificationCode.PreviewProps ={
  toName: "Abigael Wairimu",
  code: "ABC123",
}

export default EmailVerificationCode;