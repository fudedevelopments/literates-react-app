import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaStore } from 'react-icons/fa';
import styled from 'styled-components';

const ContactPage = () => {
    return (
        <Container>
            <Header>Get in Touch</Header>

            <ContactCard>
                <ContactGrid>
                    <ContactItem>
                        <IconBox>
                            <FaMapMarkerAlt size={24} />
                        </IconBox>
                        <ContactInfo>
                            <h3>Visit Us</h3>
                            <p>
                                Literates Art Emporium,<br />
                                RS Road, Vijayamangalam,<br />
                                Erode - 638056,<br />
                                Tamilnadu, India
                            </p>
                        </ContactInfo>
                    </ContactItem>

                    <ContactItem>
                        <IconBox>
                            <FaPhone size={24} />
                        </IconBox>
                        <ContactInfo>
                            <h3>Call Us</h3>
                            <PhoneLink href="tel:9944050658">+91 99440 50658</PhoneLink>
                            <PhoneLink href="tel:7373187799">+91 73731 87799</PhoneLink>
                        </ContactInfo>
                    </ContactItem>

                    <ContactItem>
                        <IconBox>
                            <FaEnvelope size={24} />
                        </IconBox>
                        <ContactInfo>
                            <h3>Email Us</h3>
                            <EmailLink href="mailto:literatesartemporium@gmail.com">
                                literatesartemporium@gmail.com
                            </EmailLink>
                        </ContactInfo>
                    </ContactItem>
                </ContactGrid>

                <VisitNote>
                    <FaStore />
                    <span>We look forward to welcoming you to our store!</span>
                </VisitNote>
            </ContactCard>
        </Container>
    );
};

export default ContactPage;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
`;

const IconBox = styled.div`
  color: #e74c3c;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactInfo = styled.div`
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: #7f8c8d;
    line-height: 1.6;
    margin: 0;
  }
`;

const PhoneLink = styled.a`
  display: block;
  color: #2980b9;
  text-decoration: none;
  margin: 0.3rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const EmailLink = styled.a`
  color: #27ae60;
  text-decoration: none;
  word-break: break-all;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const VisitNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  margin-top: 2rem;
  border-top: 2px dashed #ecf0f1;
  color: #e74c3c;
  font-weight: 500;

  span {
    color: #2c3e50;
  }
`;