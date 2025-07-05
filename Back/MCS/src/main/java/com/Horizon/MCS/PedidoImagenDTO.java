
package com.Horizon.MCS;

public class PedidoImagenDTO {

    private Long idPedido;
    private String sku;
    private String imagenProducto;

    public PedidoImagenDTO(Long idPedido, String sku, String imagenProducto) {
        this.idPedido = idPedido;
        this.sku = sku;
        this.imagenProducto = imagenProducto;
    }

    public Long getIdPedido() { return idPedido; }
    public void setIdPedido(Long idPedido) { this.idPedido = idPedido; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getImagenProducto() { return imagenProducto; }
    public void setImagenProducto(String imagenProducto) { this.imagenProducto = imagenProducto; }
}
