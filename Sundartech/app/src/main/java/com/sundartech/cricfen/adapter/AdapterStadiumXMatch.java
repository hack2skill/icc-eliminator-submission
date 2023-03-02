package com.sundartech.cricfen.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.model.StadiumXMatch;
import com.sundartech.cricfen.viewholder.ViewHolderStadiumXMatch;
import com.sundartech.cricfen.activity.ActivityStadiumXMatchDetails;

import java.util.List;

public class AdapterStadiumXMatch extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<StadiumXMatch> mListStadiumXMatch;
    private Context mContext;

    public AdapterStadiumXMatch(Context mContext, List<StadiumXMatch> mListStadiumXMatch) {
        this.mContext = mContext;
        this.mListStadiumXMatch = mListStadiumXMatch;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_stadiumx_match, parent, false);
        return new ViewHolderStadiumXMatch(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderStadiumXMatch) {
            populateItem((ViewHolderStadiumXMatch) holder, position);
        }
    }

    private void populateItem(final ViewHolderStadiumXMatch holder, final int position) {

        Glide.with(mContext)
                .load(mListStadiumXMatch.get(position).getFirstTeamFlag())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewFirstTeamFlag);

        Glide.with(mContext)
                .load(mListStadiumXMatch.get(position).getSecondTeamFlag())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewSecondTeamFlag);

        holder.mTextViewStadiumName.setText(mListStadiumXMatch.get(position).getStadiumName());
        holder.mTextViewFirstTeamName.setText(mListStadiumXMatch.get(position).getFirstTeamName());
        holder.mTextViewSecondTeamName.setText(mListStadiumXMatch.get(position).getSecondTeamName());
        holder.mTextViewMatchTime.setText(mListStadiumXMatch.get(position).getMatchTime());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, ActivityStadiumXMatchDetails.class);
                /*intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");*/
                mContext.startActivity(intent);
            }
        });

        holder.mLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //holder.itemView.performClick();
                Intent intent = new Intent(mContext, ActivityStadiumXMatchDetails.class);
                /*intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");*/
                mContext.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return mListStadiumXMatch.size();
    }

    public void clear() {
        int size = mListStadiumXMatch.size();
        mListStadiumXMatch.clear();
        notifyItemRangeRemoved(0, size);
    }
}