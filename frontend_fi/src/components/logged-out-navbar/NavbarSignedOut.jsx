import style from "./navbar.module.scss";
import { Link } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import styled from "styled-components";

const NavbarSignedOut = () => {

    const StyledButton = styled.button`
  cursor: pointer;
  color: #ffffff;
  background: inherit;
  height: 49px;
  width: 200px;
  border-radius: 45px;
  font-size: 1.25rem;
  text-transform: capitalize;
  @include flex;

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px #1a88f8;
  }
`;

    return (
        <section className={style.navbar} >
            <div>FiCave</div>

            <nav>
                <ul>
                    <li>
                        <Link>explore</Link>
                    </li>
                    <li>
                        <Link>documentation</Link>
                    </li>
                    <li>
                        <Link>media kit</Link>
                    </li>
                    <li>
                        <Link>files</Link>
                    </li>
                </ul>
            </nav>

            <Link><ConnectKitButton.Custom>
                            {({ isConnected, show, truncatedAddress, ensName }) => {
                                return (
                                <StyledButton onClick={show}>
                                    {isConnected ? ensName ?? truncatedAddress : "Connect"}
                                    
                                </StyledButton>
                                );
                            }}
                            </ConnectKitButton.Custom></Link>
        </section>
    );
};

export default NavbarSignedOut;