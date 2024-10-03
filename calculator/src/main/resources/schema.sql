CREATE TABLE IF NOT EXISTS deal (
                                    id BIGINT PRIMARY KEY,
                                    name VARCHAR(255) NOT NULL,
                                    amount DECIMAL NOT NULL,
                                    stage_id BIGINT NOT NULL,
                                    FOREIGN KEY (stage_id) REFERENCES stage(id)
);
