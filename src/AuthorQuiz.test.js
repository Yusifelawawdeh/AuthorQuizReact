import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { mount, shallow, render } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ["the shining", "It", "hamlet", "harry potter", "heart of darkness"],
    author: {
      name: "joseph conrad",
      imageUrl: "images/authors/josephconrad.jpg",
      imageSource: "Wikimedia Commons",
      books: ["heart of darkness", "the shadow line"]
    }
  },
  highlight: "none"
};

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // test  no answer being selected
  describe("when no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
    });
    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        ""
      );
    });
  });

  // test wrong answer being selected
  describe("when the wrong answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, { highlight: "wrong" })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should be a red background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "red"
      );
    });
  });

  // test correct answer being selected
  describe("when the correct answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz
          {...Object.assign({}, state, {
            highlight: "correct"
          })}
          onAnswerSelected={() => {}}
        />
      );
    });

    it("should be a green background color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
        "green"
      );
    });
  });

  // test user selects an answer being selected
  describe("when the first answer has been selected", () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(
        <AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />
      );
      wrapper.find(".answer").first().simulate("click");
    });

    it("onAnswerSelected should be called", () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });

    it("should select the Shining", () => {
        expect(handleAnswerSelected).toHaveBeenCalledWith("the shining");
    });
  });
});
