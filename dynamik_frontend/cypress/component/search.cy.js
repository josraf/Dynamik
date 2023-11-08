import React from "react";
import Search from "../../src/components/Search";

describe("Search Component", () => {
  it("performs a search and clears it", () => {
    cy.mount(<Search onSearchDevs={(data) => console.log(data)} />);

    cy.get(".search").type("John Doe");

    cy.wait(1000);

    cy.get(".search").should("have.value", "John Doe");

    cy.get(".btn-add").click();

    cy.get(".search").should("have.value", "");
  });
});
