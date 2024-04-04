import { getAnswersForQuestionController } from "../answers";
import Answer from "../../models/answers";
import * as responses from "../../utils/responses";

const mockingoose = require("mockingoose");
const httpMocks = require("node-mocks-http");
const RESPONSE_FOR_QUESTION = require("./responseForQuestion.json");

describe("AnswerController tests", () => {
  let request: any;
  let response: any;

  beforeEach(() => {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
  });

  describe("getAnswersForQuestionController", () => {
    it("should return success response", async () => {
      mockingoose(Answer).toReturn(30, "countDocuments");
      mockingoose(Answer).toReturn(RESPONSE_FOR_QUESTION, "find");
      request.params = {
        questionId: "660add405d36c5743ca836d2"
      };
      await getAnswersForQuestionController(request, response);
      expect(response.statusCode).toEqual(200);
      expect(response._getJSONData()).toEqual({
        totalCount: 30,
        answers: RESPONSE_FOR_QUESTION,
        page: 1
      });
    });

    it("should return 400 error", async () => {
      request.params = {
        questionId: "660add405d36c5743ca836d2"
      };
      request.query = {
        page: 0
      };
      await getAnswersForQuestionController(request, response);
      expect(response.statusCode).toEqual(400);
      expect(response._getJSONData()).toEqual({
        code: responses.INVALID_INPUTS
      });
    });

    it("should return 500 error", async () => {
      mockingoose(Answer).toReturn(new Error(), "countDocuments");
      request.params = {
        questionId: "660add405d36c5743ca836d2"
      };
      await getAnswersForQuestionController(request, response);
      expect(response.statusCode).toEqual(500);
      expect(response._getJSONData()).toEqual({
        code: responses.INTERNAL_SERVER_ERROR
      });
    });
  });
});
