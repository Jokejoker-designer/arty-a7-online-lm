// a7ng_typeclass_soc_chain.sv — U8-UNIFIED-SOC-XSIM-00
// Production-intent TYPE_CLASS chain (not NID bind, not Gate14 generator):
//   raw query → QSE → U6 scan/mat/score/heap → encoder V1 → lm_ctx_fwd_v1 → LM-06
// CLASS_ID is ranking identity only; encoder emits {eid,iid,rid,xid}.
// Not arty_a7_ng_native_v1_ab_soc_top. PROGRAM=NO. QHEAD=NO.
`timescale 1ns / 1ps

module a7ng_typeclass_soc_chain #(
  parameter int unsigned CAND_CAP = 64,
  parameter int unsigned K        = 8,
  parameter int unsigned MAX_NTOK = 64,
  parameter bit          SIM_FULL = 1'b1
) (
  input  logic        clk,
  input  logic        rst_n,
  input  logic        tok_valid_i,
  output logic        tok_ready_o,
  input  logic [7:0]  tok_i,
  input  logic        fire_i,
  input  logic        retire_i,
  input  logic        mem_we,
  input  logic [19:0] mem_addr,
  input  logic signed [7:0] mem_wdata,
  output logic signed [7:0] mem_rdata,
  output logic        qse_valid_o,
  output logic [7:0]  q_ent_o,
  output logic [7:0]  q_int_o,
  output logic [7:0]  q_rel_o,
  output logic [7:0]  q_ctx_o,
  output logic        retrieval_done_o,
  output logic [15:0] topk_class_id_o [K],
  output a7ng_pkg::node_id_t topk_id_o [K],
  output logic [15:0] n_host_or_o,
  output logic [6:0]  enc_ntok_o,
  output logic [7:0]  enc_tok_o [0:MAX_NTOK-1],
  output logic [3:0]  enc_n_rec_o,
  output logic [3:0]  enc_n_skip_o,
  output logic        ctx_we_o,
  output logic [6:0]  ctx_idx_o,
  output logic [6:0]  ctx_n_in_o,
  output logic [63:0] ctx_pack_o,
  output logic        start_fwd_o,
  output logic        core_busy_o,
  output logic        core_done_o,
  output logic [9:0]  pred_o,
  output logic        chain_busy_o,
  output logic        chain_done_o,
  output logic [31:0] ctx_we_beats_o,
  output logic [31:0] start_fwd_beats_o,
  output logic [2:0]  dbg_st_o
);
  import a7ng_pkg::*;

  typedef enum logic [2:0] {
    S_IDLE, S_ARM, S_GO, S_WAIT, S_DONE
  } st_t;
  st_t st;

  logic        u6_done, ovf;
  logic [15:0] n_emit, n_scored, n_trunc;
  score_t      top_sc [K];
  logic [15:0] cid_lat [0:K-1];
  logic [15:0] cid_enc [0:K-1];
  integer      ki;

  logic enc_go, enc_busy, enc_done, enc_beat_v;
  logic [3:0] enc_beat_n;
  logic [63:0] enc_pack;
  logic glue_go, glue_busy, glue_done;
  logic [9:0] glue_pred;

  assign cid_enc = cid_lat;
  assign retrieval_done_o = u6_done;
  assign chain_busy_o = (st != S_IDLE) && (st != S_DONE);
  assign dbg_st_o = st;

  a7ng_u6_typeclass_retrieval #(.CAND_CAP(CAND_CAP), .K(K)) u_u6 (
    .clk(clk), .rst_n(rst_n),
    .tok_valid_i(tok_valid_i), .tok_ready_o(tok_ready_o), .tok_i(tok_i),
    .fire_i(fire_i), .retire_i(retire_i),
    .qse_valid_o(qse_valid_o),
    .q_ent_o(q_ent_o), .q_int_o(q_int_o), .q_rel_o(q_rel_o), .q_ctx_o(q_ctx_o),
    .n_host_or_o(n_host_or_o),
    .poke_i(1'b0), .poke_go_i(1'b0),
    .poke_ent_i(8'd0), .poke_int_i(8'd0), .poke_rel_i(8'd0), .poke_ctx_i(8'd0),
    .poke_ev_i(1'b0), .poke_iv_i(1'b0), .poke_rv_i(1'b0), .poke_xv_i(1'b0),
    .stall_scan_i(1'b0), .stall_heap_i(1'b0),
    .poison_en_i(1'b0), .poison_class_id_i(16'd0), .poison_eid_i(8'd0),
    .done_o(u6_done), .retrieval_overflow_o(ovf), .retrieval_trunc_o(n_trunc),
    .n_emit_o(n_emit), .n_scored_o(n_scored),
    .topk_id_o(topk_id_o), .topk_class_id_o(topk_class_id_o), .topk_sc_o(top_sc),
    .dbg_st_o(), .dbg_scan_v_o(), .dbg_scan_id_o(),
    .dbg_mat_v_o(), .dbg_mat_id_o(),
    .dbg_mat_eid_o(), .dbg_mat_iid_o(), .dbg_mat_rid_o(), .dbg_mat_xid_o(),
    .dbg_mat_ptr_o(), .dbg_mat_cnt_o(),
    .dbg_sc_v_o(), .dbg_sc_o(), .dbg_te_o(), .dbg_ti_o(), .dbg_tr_o(), .dbg_tc_o()
  );

  a7ng_lm_ctx_encoder_v1 #(.K(K), .MAX_NTOK(MAX_NTOK)) u_enc (
    .clk(clk), .rst_n(rst_n), .go_i(enc_go),
    .class_id_i(cid_enc),
    .busy_o(enc_busy), .done_o(enc_done),
    .ntok_o(enc_ntok_o), .beat_v_o(enc_beat_v), .beat_n_o(enc_beat_n),
    .beat_pack_o(enc_pack), .tok_o(enc_tok_o),
    .n_rec_o(enc_n_rec_o), .n_skip_o(enc_n_skip_o)
  );

  a7ng_lm_ctx_fwd_v1 u_fwd (
    .clk(clk), .rst_n(rst_n), .go_i(glue_go),
    .enc_go_o(enc_go),
    .enc_busy_i(enc_busy), .enc_done_i(enc_done), .enc_ntok_i(enc_ntok_o),
    .enc_beat_v_i(enc_beat_v), .enc_beat_n_i(enc_beat_n),
    .enc_beat_pack_i(enc_pack),
    .core_busy_i(core_busy_o), .core_done_i(core_done_o), .core_pred_i(pred_o),
    .ctx_we_o(ctx_we_o), .ctx_idx_o(ctx_idx_o), .ctx_n_in_o(ctx_n_in_o),
    .ctx_pack_o(ctx_pack_o), .start_fwd_o(start_fwd_o),
    .busy_o(glue_busy), .done_o(glue_done), .pred_o(glue_pred),
    .ctx_we_beats_o(ctx_we_beats_o), .start_fwd_beats_o(start_fwd_beats_o)
  );

  tiny_gpt803k_core #(.SIM_FULL(SIM_FULL)) u_lm06 (
    .clk(clk), .rst_n(rst_n),
    .mem_we(mem_we), .mem_addr(mem_addr), .mem_wdata(mem_wdata),
    .mem_rdata(mem_rdata),
    .ctx_we(ctx_we_o), .ctx_idx(ctx_idx_o), .ctx_n_in(ctx_n_in_o),
    .ctx_pack(ctx_pack_o),
    .start_fwd(start_fwd_o),
    .start_train(1'b0), .start_ce(1'b0), .start_corpus(1'b0),
    .after_mode(1'b0), .do_snap(1'b0), .do_restore(1'b0), .do_fold(1'b0),
    .tgt_in(10'd0), .lr_in(4'd0), .corpus_n(8'd0), .corpus_ep(8'd0),
    .busy(core_busy_o), .done(core_done_o), .pred(pred_o),
    .last_loss(), .ce0(), .ce1(), .wr_n(), .xor32(), .add32(),
    .phase(), .w_stall(),
    .clk_dma(1'b0), .rst_dma_n(1'b1),
    .wdma_owner(), .wdma_go(), .wdma_wr(), .wdma_addr(), .wdma_bytes(),
    .wdma_busy(1'b0), .wdma_done(1'b0),
    .wdma_w_valid(), .wdma_w_ready(1'b0), .wdma_w_data(),
    .wdma_r_valid(1'b0), .wdma_r_ready(), .wdma_r_data(128'd0),
    .dbg_tile_bst(), .dbg_tile_dst(), .dbg_tile_rg(),
    .dbg_tile_miss(), .dbg_tile_dirty(), .dbg_tile_req(), .dbg_tile_req_s1()
  );

  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      st <= S_IDLE;
      glue_go <= 1'b0;
      chain_done_o <= 1'b0;
      for (ki = 0; ki < K; ki = ki + 1)
        cid_lat[ki] <= 16'd0;
    end else begin
      glue_go <= 1'b0;
      chain_done_o <= 1'b0;
      unique case (st)
        S_IDLE: begin
          if (u6_done) begin
            for (ki = 0; ki < K; ki = ki + 1)
              cid_lat[ki] <= topk_class_id_o[ki];
            st <= S_ARM;
          end
        end
        S_ARM: st <= S_GO;
        S_GO: begin
          if (!enc_busy && !core_busy_o && !glue_busy) begin
            glue_go <= 1'b1;
            st <= S_WAIT;
          end
        end
        S_WAIT: begin
          if (glue_done) begin
            chain_done_o <= 1'b1;
            st <= S_DONE;
          end
        end
        S_DONE: st <= S_IDLE;
        default: st <= S_IDLE;
      endcase
    end
  end
endmodule
