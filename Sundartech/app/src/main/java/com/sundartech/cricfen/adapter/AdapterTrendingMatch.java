package com.sundartech.cricfen.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.model.TrendingMatch;
import com.sundartech.cricfen.viewholder.ViewHolderTrendingMatch;

import java.util.List;

public class AdapterTrendingMatch extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<TrendingMatch> mListTrendingMatch;
    private Context mContext;

    public AdapterTrendingMatch(Context mContext, List<TrendingMatch> mListTrendingMatch) {
        this.mContext = mContext;
        this.mListTrendingMatch = mListTrendingMatch;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_trending_match, parent, false);
        return new ViewHolderTrendingMatch(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderTrendingMatch) {
            populateItem((ViewHolderTrendingMatch) holder, position);
        }
    }

    private void populateItem(final ViewHolderTrendingMatch holder, final int position) {

        Glide.with(mContext)
                .load(mListTrendingMatch.get(position).getMatchBackdrop())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewMatchBackDrop);

        Glide.with(mContext)
                .load(mListTrendingMatch.get(position).getFirstTeamFlag())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewFirstTeamFlag);

        Glide.with(mContext)
                .load(mListTrendingMatch.get(position).getSecondTeamFlag())
                /*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*/
                .into(holder.mImageViewSecondTeamFlag);

        holder.mTextViewMatchType.setText(mListTrendingMatch.get(position).getMatchType());
        holder.mTextViewMatchStatus.setText(mListTrendingMatch.get(position).getMatchStatus());
        holder.mTextViewTourName.setText(mListTrendingMatch.get(position).getTourName().toUpperCase());
        holder.mTextViewFirstTeamName.setText(mListTrendingMatch.get(position).getFirstTeamShortName());
        holder.mTextViewFirstTeamUpdate1.setText(mListTrendingMatch.get(position).getFirstTeamUpdate1());
        holder.mTextViewFirstTeamUpdate2.setText(mListTrendingMatch.get(position).getFirstTeamUpdate2());
        holder.mTextViewSecondTeamName.setText(mListTrendingMatch.get(position).getSecondTeamShortName());
        holder.mTextViewSecondTeamUpdate1.setText(mListTrendingMatch.get(position).getSecondTeamUpdate1());
        holder.mTextViewSecondTeamUpdate2.setText(mListTrendingMatch.get(position).getSecondTeamUpdate2());
        holder.mTextViewMatchRemarks.setText(mListTrendingMatch.get(position).getMatchRemarks());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                /*Intent intent = new Intent(mContext, ActivityExploredCinema.class);
                intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);*/
            }
        });

        holder.mLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.itemView.performClick();
            }
        });

    }

    @Override
    public int getItemCount() {
        return mListTrendingMatch.size();
    }

    public void clear() {
        int size = mListTrendingMatch.size();
        mListTrendingMatch.clear();
        notifyItemRangeRemoved(0, size);
    }
}