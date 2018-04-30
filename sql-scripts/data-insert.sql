INSERT IGNORE arcade_machine values /*duplicate key => ignore add */
 ('Sound Voltex', 0001, 6, 0),
 ('Sound Voltex', 0002, 6, 0),
 ('Beatmania IIDX', 0003, 6, 0),
 ('Beatmania IIDX', 0004, 6, 0),
 ('Piano Tiles', 0005, 4, 0),
 ('Dance Dance Revolution', 0006, 6, 0),
 ('Pump It Up', 0007, 6, 0);
 
INSERT IGNORE employee values
	(0001, 'Bren', 'Waiter'),
    (0002, 'Calvin', 'Cashier'),
    (0003, 'Ijaaz', 'Technician'),
    (0004, 'Dominique', 'DJ'),
    (0005, 'Manas', 'Chef'),
    (0006, 'Camellia', 'DJ');
    
INSERT IGNORE customer values
(0000, 10.00, 0.00),
(0001, 50.00, 0.00),
(0002, 50.00, 0.00),
(0003, 25.00, 10.00),
(0004, 100.00, 0.00),
(0005, 1000.00, 0.00);

INSERT IGNORE beverage values 
('Apple Soju', 0000, 5.00),
('Coke', 0010, 2.50),
('Sprite', 0011, 2.50),
('Ramune', 0012, 3.00);
    
    
INSERT IGNORE pool_table values
(0000, 3),
(1234, 6);

INSERT IGNORE food values 
('Cheeseburger', 0000, 2.50),
('Chicken Bake', 0001, 2.99);

INSERT IGNORE gift_shop values
(1234, 'PS4', 10, 500.00),
(9999, 'CMPE 138', 1, 999.99);
