import * as authNController from "controllers/authNController";
import { Router } from "express";
import { AUTH_PROVIDERS } from "shared-types";
import * as asyncAuthNValidators from "validators/async/authN";
import * as authNValidators from "validators/authN";

const router = Router();

const BASE_ROUTE = "/n";

router.post(
  `${BASE_ROUTE}/classic`,
  authNValidators.signUpClassicValidator,
  asyncAuthNValidators.signUpClassicValidator,
  authNController.signUpClassic
);
router.post(
  `${BASE_ROUTE}/sign-in/classic`,
  authNValidators.signInClassicValidator,
  asyncAuthNValidators.signInClassicValidator,
  asyncAuthNValidators.checkBanned,
  asyncAuthNValidators.checkAuthProvider(AUTH_PROVIDERS.CLASSIC),
  asyncAuthNValidators.checkSuspension,
  asyncAuthNValidators.checkPassword,
  authNController.signInClassic
);

export default router;
