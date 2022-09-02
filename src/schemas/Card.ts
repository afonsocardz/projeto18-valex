import joi from 'joi';

export const CardType = joi.string().equal('groceries', 'restaurant', 'transport', 'education', 'health');