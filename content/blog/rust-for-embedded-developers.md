## The Problem with C in Embedded

C has been the lingua franca of embedded development for decades, but it comes with well-known pitfalls: buffer overflows, null pointer dereferences, and data races. In safety-critical systems, these bugs can be catastrophic.

## Enter Rust

Rust's ownership model prevents entire classes of bugs at compile time:

- **No null pointers** — Option types instead
- **No data races** — ownership and borrowing rules
- **No buffer overflows** — bounds checking
- **Zero-cost abstractions** — no runtime overhead

```rust
fn read_sensor(peripheral: &mut SensorPeripheral) -> Result<f32, SensorError> {
    let raw = peripheral.read_register(TEMP_REG)?;
    Ok(raw as f32 * 0.0625)
}
```

## The Ecosystem

The embedded Rust ecosystem has matured significantly with projects like `embassy`, `probe-rs`, and hardware abstraction layers for most popular MCU families.

## Conclusion

While C isn't going anywhere soon, Rust offers a compelling path forward for new embedded projects, especially those with safety or reliability requirements.
