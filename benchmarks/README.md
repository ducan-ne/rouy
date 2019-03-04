# Benchmark

thanks @rknguyen

- **Machine:** MacBook Pro ( mid 2014 | 2.5 GHz Intel Core i7 | 16 GB 1600 MHz DDR3)
- **Method:** autocannon -c 100 -d 5 -p 10 localhost:3000 (two rounds; one warm-up, one to measure).
- **Node:** v11.0.0

|         | Version | Requests/s (% of fastify) | Latency (% of fastify) | Throughput/Mb (% of fastify) | Memory MB (% of fastify) |
| :------ | ------: | :-----------------------: | ---------------------: | ---------------------------: | -----------------------: |
| node    |     N/A |     35057.6 (100.00)      |          2.74 (100.00) |                5.48 (100.00) |           58.30 (100.00) |
| fastify |  ^2.0.0 |       30373 (86.64)       |          3.17 (115.69) |                 4.75 (86.63) |           66.02 (113.23) |
| rouy    |   0.1.4 |      29403.4 (83.87)      |          3.29 (120.07) |                 4.54 (82.83) |           67.51 (115.79) |
| micro   |  ^9.3.3 |       28268 (80.63)       |          3.41 (124.45) |                 4.42 (80.62) |           63.74 (109.32) |
| express | ^4.16.4 |      13992.4 (39.91)      |          6.92 (252.55) |                 2.19 (39.91) |           67.00 (114.92) |
