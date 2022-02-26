import React from "react";
import Card from "../../components/Card/index";
import { render, screen } from "@testing-library/react";

describe("Card component", () => {
  it("should be render Card", () => {
    render(
      <Card
        id={1}
        title={"teste"}
        description={"teste"}
        likes={5}
        isResolved={false}
        coments={["teste", "teste2"]}
      />
    );

    const element = screen.getByText("/teste/");
    expect(element).toBeInTheDocument();
  });
});
