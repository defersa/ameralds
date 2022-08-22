import { FormErrorResponse } from "@am/cdk/forms/form-async-error.handler";
import { ResultRequest } from "@am/interface/request.interface";

export type AuthRegistrationRequest = FormErrorResponse & ResultRequest;
