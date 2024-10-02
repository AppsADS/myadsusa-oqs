INSERT INTO stage (id, name, description) VALUES
                                              (1, 'Order Review', 'Deal under review by Finance Dept'),
                                              (2, 'Order Approved', 'Deal approved and being processed by Operations'),
                                              (3, 'Scheduled Confirmed', 'Deal has been confirmed and scheduled with client'),
                                              (4, 'Delivery and Install Complete', 'Deal has been delivered and signed for by client'),
                                              (5, 'Being Paid', 'Deal being paid');

INSERT INTO deal (id, name, amount, stage_id) VALUES
                                                  (77, 'Action Press', 80000, 2),
                                                  (63, 'Philip Moores Funeral Services', 45000, 3);
