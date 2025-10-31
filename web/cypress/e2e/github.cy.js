describe("Gerenciamento de perfis no Github", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Tabela", "Perfis do GitHub");
  });

  it("Deve cadastrar um novo perfil do github", () => {
    cy.get("#name").type("Bruno Leonardo");
    cy.get("#username").type("bruno-leonardo-dev");
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.get("#name").type("Bruno Leonardo");
    cy.get("#username").type("leo-dev");
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", "leo-dev")
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").contains("td", "Bruno Leonardo").should("be.visible");

    cy.get("@trProfile").contains("td", "QA").should("be.visible");
  });

  it("Deve remover um perfil do github", () => {
    const profile = {
      name: "Bruno Leonardo",
      username: "bruno-dev",
      desc: "QA",
    };

    cy.get("#name").type(profile.name);
    cy.get("#username").type(profile.username);
    cy.get("#profile").type(profile.desc);

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").find('button[title="Remover perfil"]').click();

    cy.contains("table tbody", profile.username).should("not.exist");
  });

  it("Deve validar o link do github", () => {
    const profile = {
      name: "Bruno Leonardo",
      username: "bruno-leonardo-dev",
      desc: "QA",
    };

    cy.get("#name").type(profile.name);
    cy.get("#username").type(profile.username);
    cy.get("#profile").type(profile.desc);

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").find('a')
      .should('have.attr', 'href', `https://github.com/${profile.username}`)
      .and('have.attr', 'target', '_blank')
  });
});
