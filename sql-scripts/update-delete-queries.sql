/* UPDATE */
UPDATE customer
SET balance = balance - arcade_machine.game_cost, money_spent = money_spent + arcade_machine.game_cost
WHERE cust_id='some number';

/* DELETE */
DELETE FROM customer
WHERE cust_id='some id';
