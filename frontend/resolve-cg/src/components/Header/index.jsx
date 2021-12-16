import { Content, ContainerB } from "./styles";

export function Header() {
  return (
    <>
      <ContainerB>
        <Content>
          <h1>Resolve.CG</h1>
          <nav>
            <a className="active" href="/">
              Home
            </a>
            <a href="/">New Problem</a>
          </nav>
        </Content>
      </ContainerB>
    </>
  );
}
