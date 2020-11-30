import passport from 'passport';
import { getRepository } from "typeorm";
import { User } from "../db/entities/user";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret } from '../config/jwt.config'

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email: string, password: string, next): Promise<void> => {
      const userRepository = getRepository(User)
      const user = await userRepository.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return next(
          null,
          null,
        );
      }

      if (user.password && user.password !== password) {
        return next(
          null,
          null,
        );
      }

      return next(null, user);
    },
  ),
);

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    // eslint-disable-next-line consistent-return
    async (req, email: string, password: string, next): Promise<void> => {
      const userRepository = getRepository(User)
      const checkingUser = await userRepository.findOne({ where: { email } });

      if (checkingUser) {
        return next(null, null);
      }

      const user = new User();
      user.email = email
      user.password = password
      const result = await userRepository.save(user)
      next(null, result)
    },
  ),
);

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    },
    async ({ id }: { id: string }, next): Promise<void> => {
      try {
        const userRepository = getRepository(User)
        const user = await userRepository.findOne(id);

        return next(null, user);
      } catch (error) {
        return next(null, null);
      }
    },
  ),
);

export default passport;